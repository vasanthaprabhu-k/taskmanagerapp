import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';
 
  constructor(private crudService: CrudService) {}

  ngOnInit() : void {
    this.editTaskValue = '';
    this.addTaskValue = '';
     this.taskObj = new Task();
     this.taskArr = [];
     this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe({
      next: (res) => {
        this.taskArr = res;
      },
      error: (err) => {
        alert("Unable to get list of tasks");
      }
    });
  }
  

   addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next: (res) =>{
        this.ngOnInit();
        this.addTaskValue = '';
      },
     error:(err) =>{
      alert(err);
    }});
   } 

   editTask() {
    this.taskObj.task_name = this.editTaskValue; 
    this.crudService.editTask(this.taskObj).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        alert("Failed To update task");
      }
    });
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        alert("Failed to delete task");
      }
    });
  }

  call(etask : Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }

}
