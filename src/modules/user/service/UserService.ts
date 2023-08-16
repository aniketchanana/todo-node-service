import { IUserRepository } from "../repository/UserRepository";
import jwt from "jsonwebtoken";
import { AuthMessages } from "../../../constants/messages";
import { IPublicUser, IUserModel } from "../../../data/interfaces";
import { inject, injectable } from "inversify";
import { Types } from "../../../DiTypes";
import { compareHash, createHash } from "../../../utils/hasing";
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

  public async createUserAndGenerateAuthToken(
    name: string,
    emailId: string,
    password: string
  ): Promise<IPublicUser> {
    const token = this.generateFreshAuthToken(emailId);
    const hashedPassword = await createHash(password);
    const newUser = await this.userRepository.createNewUser({
      name,
      emailId,
      password: hashedPassword,
      token,
    });

    return newUser;
  }

  public async signInUser(emailId: string, password: string) {
    const tempUser = await this.userRepository.getUserByEmail(emailId);
    if (!tempUser) {
      throw new Error(AuthMessages.UNABLE_TO_SIGN_IN);
    }
    const isMatch = await compareHash(password, tempUser.password);
    if (!isMatch) {
      throw new Error(AuthMessages.UNABLE_TO_SIGN_IN);
    }

    const newToken = this.generateFreshAuthToken(emailId);
    return await this.userRepository.updateExistingUserDetails(tempUser.uuid, {
      token: newToken,
    });
  }

  public async clearUserAuthToken(userId: string) {
    await this.userRepository.updateExistingUserDetails(userId, {
      token: "",
    });
  }
}
