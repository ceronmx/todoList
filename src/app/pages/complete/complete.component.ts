import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/interfaces/taskResponse.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  loading: boolean = false;
  userTasks: Task[];
  userCompletedTasks: Task[];

  constructor(private _userService: UserService,
              private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  
  private async getTasks(){
    this.loading = true;
    try {
      const res = await this._userService.getTasks().toPromise();

      this.userTasks = res.response;
      this.userCompletedTasks = this.userTasks.filter(task => task.completed)

    } catch (error) {
      console.log(error);
      this._toastrService.error('Something went wrong!')
    }

    this.loading = false;
  }

  async deleteTask(task: Task){
    this.loading = true;
    try {
      const res: any = await this._userService.deleteTask(task._id).toPromise();
      if(!res.error){
        this._toastrService.success('Task deleted');
        this.getTasks();
      }
    } catch (error) {
      console.log(error);
      this._toastrService.error(error.error.response);
    }
  }
}
