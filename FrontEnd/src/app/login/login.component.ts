import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide=true;
  respondingMsg: string='';
  loginForm: FormGroup;

  
  constructor(private fb: FormBuilder,private api: ApiService, private router: Router)  {
    this.loginForm=fb.group(
      {
       
        email:fb.control('', [Validators.required, Validators.email]),
        password:fb.control('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        ]),
        rpassword: fb.control(''),
        userType:fb.control('student'),
      },
      
    );
    
  }
  login(){
    let loginInfo ={
     email: this.loginForm.get('email')?.value, 
     password: this.loginForm.get('password')?.value,
    };
    this.api.login(loginInfo).subscribe({
      next: (res:any)=>{
        if(res.toString()==='Invalid'){
          this.respondingMsg='Invalid Credentials!';
        }
        else
        {
          this.respondingMsg='';
          this.api.saveToken(res.toString());
          let isActive=this.api.getTokenUserInfo()?.active??false;
          if(isActive) {
            this.router.navigateByUrl('/books/library');
          }
          else
          {
            this.respondingMsg='You are not Active!';
            this.api.deleteToken();

          }
        }
      },
      error:(err:any)=> {
        console.log('Error: ');
        console.log(err);
      },
    })
   }
 
  getEmailErrors(){
    if (this.Email.hasError('required'))return 'Feild is required!';
    if (this.Email.hasError('email'))return 'Email is invalid.';
    return '';
  }

  getPasswordErrors(){
    if (this.Password.hasError('required'))return 'Feild is required!';
    if (this.Password.hasError('minlength'))
    return 'Minimum 8 characters are required!';
    if (this.Password.hasError('maxlength'))
    return 'Minimum 15 characters are required!';
    return '';
  }

  get Email(): FormControl{
    return this.loginForm.get('email') as FormControl;
  }
  get Password(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }

}
