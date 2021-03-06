import { HttpResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { pageTransition } from '../../animations';

import { UsersService } from './users.service';
import { User } from './user';
import { NotificationsService } from 'angular2-notifications';
import { ToastNotificationsService } from '../../shared/toast-notifications.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [pageTransition]
})
export class UsersComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  selectedUsers = [];
  subscription;
  users: User[];

  public createOpened = false;
  public editOpened = false;
  public deleteOpened = false;

  constructor(
    private usersService: UsersService,
    private notificationsService: ToastNotificationsService,
    private notifications: NotificationsService,
    protected translateService: TranslateService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadUsers() {
    this.subscription = this.usersService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error)); // this.notificationsService.error(error.status, error.error));
  }

  onAdd() {
    this.createOpened = true;
  }

  onEdit() {
    this.editOpened = true;
  }

  onDelete() {
    this.deleteOpened = true;
  }

  getBackgroundColor(user: User): string {
    return `hsl(${user.avatarColor}, 53%, 90%)`;
  }

  getColor(user: User): string {
    return `hsl(${user.avatarColor}, 50%, 50%)`;
  }

  createUser(user: User) {
    // remove unused field (used only for validation)
    delete user.confirmPassword;
    user.avatarColor = Math.floor(Math.random() * 360);

    this.usersService.createUser(user).subscribe(
      (response: HttpResponse<User>) => {
        if (response.status === 201) {
          this.notificationsService.successfullyCreated(`${user.lastName} ${user.firstName}`);

          this.users.push(response.body);
        }
      },
      error => {
        console.log(error);
        if (error.error.statusCode === 400) {
          this.notificationsService.badRequest();
        } else if (error.error.statusCode === 403) {
          this.notificationsService.forbidden();
        } else {
          this.notificationsService.commonError();
        }
      }
    );
  }

  updateUser(user: User) {
    // TODO thinking about password change
    // remove unused field (used only for validation)
    delete user.confirmPassword;

    if (user.email === 'admin') {
      this.notifications.warn(
        '',
        this.translateService.instant('USERCREATEPAGE.ADMIN_CANT_BE_EDITED')
      );
    } else {
      this.usersService.updateUser(user, user._id).subscribe(
        response => {
          if (response.status === 200) {
            this.notificationsService.successfullyUpdated(`${user.lastName} ${user.firstName}`);

            // update local array of users
            const foundIndex = this.users.findIndex(mUser => mUser._id === user._id);
            this.users[foundIndex] = user;

            // remove selection
            this.selectedUsers = [];
          }
        },
        error => {
          console.log(error);
          if (error.error.statusCode === 400) {
            this.notificationsService.badRequest();
          } else if (error.error.statusCode === 403) {
            this.notificationsService.forbidden();
          } else {
            this.notificationsService.commonError();
          }
        }
      );
    }
    // remove selection
    this.selectedUsers = [];
  }

  forceDelete($event) {
    this.selectedUsers.forEach(selectedUser => {
      if (selectedUser.email === 'admin') {
        this.notifications.warn(
          '',
          this.translateService.instant('USERCREATEPAGE.ADMIN_CANT_BE_DELETED')
        );
      } else {
        this.usersService.deleteUser(selectedUser._id).subscribe(
          response => {
            if (response.status === 200) {
              this.notificationsService.successfullyDeleted(`${selectedUser.lastName} ${selectedUser.firstName}`);

              this.users = this.users.filter(users => users !== selectedUser);
            }
          },
          error => {
            console.log(error);
            if (error.error.statusCode === 400) {
              this.notificationsService.badRequest();
            } else if (error.error.statusCode === 403) {
              this.notificationsService.forbidden();
            } else {
              this.notificationsService.commonError();
            }
          }
        );
      }
    });
    // remove selection
    this.selectedUsers = [];
  }

}
