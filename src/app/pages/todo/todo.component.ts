import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Task, TaskResponse } from 'src/app/interfaces/taskResponse.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  loading: boolean = false;
  userTasks: Task[];
  userTodoTask: Task[];

  addTaskForm: FormGroup = this.fb.group({
    newTask: ['',[ Validators.required, Validators.pattern('[^0-9]*') ]]
  })

  get newTaskInvalid(){
    return this.addTaskForm.get('newTask').dirty && 
           this.addTaskForm.get('newTask').invalid &&
           this.addTaskForm.get('newTask').value !== '';
  }

  constructor(private fb: FormBuilder,
              private _userService: UserService,
              private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getTasks();

  }

  private async getTasks(){
    this.loading = true;
    try {
      const res = await this._userService.getTasks().toPromise();

      this.userTasks = res.response;
      this.userTodoTask = this.userTasks.filter(task => !task.completed)

    } catch (error) {
      this._toastrService.error('Something went wrong!')
    }

    this.loading = false;
  }

  async addTask(){
    if(this.addTaskForm.invalid){
      return;
    }
    
    this.loading = true;
    const description = this.addTaskForm.get('newTask').value;
    try {
      const res = await this._userService.createTask(description.toString()).toPromise();
      this.getTasks();
    } catch (error) {
      this._toastrService.error(error.error.response);
    }

    this.loading = false;
    this.addTaskForm.reset();
    
  }

  async completeTask(task: Task){
    this.loading = true;

    try {
      const res: any = await this._userService.completeTask(task._id).toPromise()
      if(!res.error){
        this._toastrService.success('Task completed');
        this.getTasks();
      }
    } catch (error) {
      this._toastrService.error(error.error.response);
    }

  }

}
