import { inject, injectable } from "inversify";
import { AuthMessages } from "../../../constants/messages";
import {
  AppDataSource,
  IPublicUser,
  IUserModel,
} from "../../../data/interfaces";
import { Types } from "../../../DiTypes";

export interface IUserRepository {
  createNewUser: (userDetails: Omit<IUserModel, "_id">) => Promise<IPublicUser>;
  getUserByEmail: (emailId: string) => Promise<IUserModel>;
  updateExistingUserDetails: (
    userId: string,
    updates: Partial<IUserModel>
  ) => Promise<IPublicUser>;
}
@injectable()
export class UserRepository implements IUserRepository {
  @inject(Types.USER_TABLE) private userTable: AppDataSource<IUserModel>;

  private getPublicUserProfile(user: IUserModel): IPublicUser {
    return {
      _id: user._id,
      name: user.name,
      emailId: user.emailId,
      token: user.token,
    } as IPublicUser;
  }
  public async createNewUser(userDetails: IUserModel) {
    try {
      const newUserDetails = await this.userTable.create(userDetails);
      const publicUserDetails = this.getPublicUserProfile(newUserDetails);
      return publicUserDetails;
    } catch (e) {
      throw new Error(AuthMessages.UNABLE_TO_CREATE_NEW_USER);
    }
  }

  public async getUserByEmail(emailId: string) {
    const user = await this.userTable.findOne({ emailId });
    if (!user) {
      throw new Error(AuthMessages.USER_NOT_FOUND);
    }
    return user;
  }

  public async updateExistingUserDetails(
    userId: string,
    updates: Partial<IUserModel>
  ): Promise<IPublicUser> {
    try {
      const updatedUserDetails = await this.userTable.findOneAndUpdate(
        {
          _id: userId,
        },
        updates
      );
      return this.getPublicUserProfile(updatedUserDetails);
    } catch (e) {
      throw new Error(AuthMessages.UNABLE_TO_SIGN_IN);
    }
  }
}
