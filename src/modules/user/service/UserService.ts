import { IUserRepository } from "../repository/UserRepository";
import jwt from "jsonwebtoken";
import { AuthMessages } from "../../../constants/messages";
import { decrypt, sha256Encryption } from "../../../utils/encryption";
import { isEqual } from "lodash";
import { IPublicUser, IUserModel } from "../../../data/interfaces";
import { inject, injectable } from "inversify";
import { Types } from "../../../DiTypes";
export interface IUserService {
  createUserAndGenerateAuthToken: (
    name: string,
    emailId: string,
    password: string
  ) => Promise<IPublicUser>;
  signInUser: (emailId: string, password: string) => Promise<IPublicUser>;
  clearUserAuthToken: (userId: string) => Promise<void>;
}

@injectable()
export class UserService implements IUserService {
  @inject(Types.USER_REPOSITORY) private userRepository: IUserRepository;

  private generateFreshAuthToken(emailId: string): string {
    return jwt.sign({ emailId: emailId.toString() }, process.env.JWT, {
      expiresIn: Math.floor(Date.now()) + 1000 * 60 * 60 * 24 * 30, // 30 days
    });
  }

  private verifyPassword(
    incomingPlacePass: string,
    existingEncryptedPass: string
  ): boolean {
    return isEqual(sha256Encryption(incomingPlacePass), existingEncryptedPass);
  }

  public async createUserAndGenerateAuthToken(
    name: string,
    emailId: string,
    password: string
  ): Promise<IPublicUser> {
    const token = this.generateFreshAuthToken(emailId);
    const encryptedPassword = sha256Encryption(decrypt(password));

    const newUser = await this.userRepository.createNewUser({
      name,
      emailId,
      password: encryptedPassword,
      token,
    } as IUserModel);

    return newUser;
  }

  public async signInUser(emailId: string, password: string) {
    const tempUser = await this.userRepository.getUserByEmail(emailId);
    if (!tempUser) {
      throw new Error(AuthMessages.UNABLE_TO_SIGN_IN);
    }
    const isMatch = this.verifyPassword(decrypt(password), tempUser.password);
    if (!isMatch) {
      throw new Error(AuthMessages.UNABLE_TO_SIGN_IN);
    }

    const newToken = this.generateFreshAuthToken(emailId);
    return await this.userRepository.updateExistingUserDetails(tempUser._id, {
      token: newToken,
    });
  }

  public async clearUserAuthToken(userId: string) {
    await this.userRepository.updateExistingUserDetails(userId, {
      token: "",
    });
  }
}
