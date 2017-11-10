import { Component, OnInit, Input, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  commentsForm: FormGroup;
  comment: Comment;
  errMess: String;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
  	@Inject('BaseURL') private BaseURL) { 

    this.createForm();

  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
    	errMess => this.errMess = errMess);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });

    // let id = +this.route.snapshot.params['id'];
    // this.dishservice.getDish(id)
    //   .then(dish => this.dish = dish); 
 }
  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {

    this.commentsForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      rating: ['5'],
      comment: ['', [Validators.required] ]
    });

    this.commentsForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }

  onValueChanged(data?: any) {
    if (!this.commentsForm) { return; }
    if(!this.commentsForm.invalid){
    	this.comment = this.commentsForm.value;
    	this.comment.date = new Date().toISOString();
    }
    console.log(this.comment)
    const form = this.commentsForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Author is required.',
      'minlength':     'Author must be at least 2 characters long.'
    },
    'comment': {
      'required':      'Comment is required.'
    },
  };

  onSubmit() {
    this.comment = this.commentsForm.value;
    console.log(this.comment);
    this.dish.comments.push(this.comment);
    this.commentsForm.reset({
      author: '',
      comment: ''																																																																																																																																																						
    });
  }

}
