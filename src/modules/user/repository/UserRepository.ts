import { inject, injectable } from "inversify";
import { AuthMessages } from "../../../constants/messages";
import {
  AppDataSource,
  PublicUserAttributes,
  IUserModel,
} from "../../../data/interfaces";
import { Types } from "../../../DiTypes";

export interface IUserRepository {
  createNewUser: (
    userDetails: Omit<IUserModel, "_id">
  ) => Promise<PublicUserAttributes>;
  getUserByEmail: (emailId: string) => Promise<IUserModel>;
  updateExistingUserDetails: (
    userId: string,
    updates: Partial<IUserModel>
  ) => Promise<PublicUserAttributes>;
}
@injectable()
export class UserRepository implements IUserRepository {
  @inject(Types.USER_TABLE) private userTable: AppDataSource<IUserModel>;

  private getPublicUserProfile(user: IUserModel): PublicUserAttributes {
    return {
      uuid: user.uuid,
      name: user.name,
      emailId: user.emailId,
      token: user.token,
    } as PublicUserAttributes;
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
  ): Promise<PublicUserAttributes> {
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
