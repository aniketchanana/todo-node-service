import { inject, injectable } from "inversify";
import { AuthMessages } from "../../../constants/messages";
import {
  AppDataSource,
  IPublicUser,
  IUserModel,
  IUser,
} from "../../../data/interfaces";
import { Types } from "../../../DiTypes";

export interface IUserRepository {
  createNewUser: (userDetails: Partial<IUser>) => Promise<IPublicUser>;
  getUserByEmail: (emailId: string) => Promise<IUser>;
  updateExistingUserDetails: (
    userId: string,
    updates: Partial<IUser>
  ) => Promise<IPublicUser>;
}
@injectable()
export class UserRepository implements IUserRepository {
  @inject(Types.USER_TABLE) private userTable: AppDataSource<IUserModel>;

  private getPublicUserProfile(user: IUser): IPublicUser {
    return {
      uuid: user.uuid,
      name: user.name,
      emailId: user.emailId,
      token: user.token,
    };
  }
  public async createNewUser(userDetails: Partial<IUser>) {
    try {
      const newUserDetails = await this.userTable.create(userDetails);
      const publicUserDetails = this.getPublicUserProfile(newUserDetails);
      return publicUserDetails;
    } catch (e) {
      throw new Error(AuthMessages.UNABLE_TO_CREATE_NEW_USER);
    }
  }

  public async getUserByEmail(emailId: string) {
    try {
      const user = await this.userTable.findOne({ emailId });
      if (!user) {
        throw new Error();
      }
      return user;
    } catch {
      throw new Error(AuthMessages.INVALID_USER);
    }
  }

  public async updateExistingUserDetails(
    userId: string,
    updates: Partial<IUser>
  ): Promise<IPublicUser> {
    try {
      const updatedUserDetails = await this.userTable.findOneAndUpdate(
        {
          uuid: userId,
        },
        updates
      );
      return this.getPublicUserProfile(updatedUserDetails);
    } catch (e) {
      throw new Error(AuthMessages.UNABLE_TO_SIGN_IN);
    }
  }
}
