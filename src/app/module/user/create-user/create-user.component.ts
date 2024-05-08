import {Component, Injector, OnInit} from '@angular/core';
import {AbstractComponent} from "../../../libs/canal-commons/abstract/AbstractComponent";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {User} from "../../../model/user";
import {UserService} from "../../../service/user/user.service";

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent extends AbstractComponent<User> implements OnInit {

    public userForm!: FormGroup | any;

    roles  :any[] = [];
    submitted : boolean = false;
    public errorMessage: any;

    constructor(
        injector: Injector,
        private formBuilder: FormBuilder,
        private ref: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig ,
        private userService:UserService,
        private messageService: MessageService,
    ) {
        super(injector);
    }

    override ngOnInit(): void {
        this.selectedDataset = this.dialogConfig.data?.users as User;
        this.userForm = this.createFormModel(this.selectedDataset);

    }


    protected createFormModel(data: User): FormGroup {
        return  this.formBuilder.group({
            name: new FormControl(data?.name, Validators.required),
            email: new FormControl(data?.email, [Validators.required, Validators.email]),
            phone: new FormControl(data?.phone),
            company_id: new FormControl(data?.company_id),
            user_type_id: new FormControl(data?.user_type_id),
            account_id: new FormControl(data?.account_id),
            password: new FormControl(data?.password, Validators.required)
        })
    }
    protected override getModelFromForm(): User {
        return Object.assign({} , this.selectedDataset, {
            name: this.userForm.get('name')?.value,
            email: this.userForm.get('email')?.value,
            phone: this.userForm.get('phone')?.value,
            company_id: this.userForm.get('company_id')?.value,
            user_type_id: this.userForm.get('user_type_id')?.value,
            account_id: this.userForm.get('account_id')?.value,
            password: this.userForm.get('password')?.value
        })
    }

    createUser() {
        this.submitted = true;
        let data = this.getModelFromForm() as unknown as User;
        console.log(data)
        if (this.userForm.valid) {
            this.addSubscription("create" , this.userService.addUser(data).subscribe({
                next: (data) => {
                    this.ref.close();
                },
                error: error => {
                    this.submitted = false;
                }
            }))
        }
    }

    updateUser() {
        this.submitted = true
        let data = this.getModelFromForm() as unknown  as User;
        console.log(data)
        if (this.userForm.valid) {
            // @ts-ignore
            this.addSubscription("updateUser" , this.userService.updateUser(data,this._selectedDataset.user_id).subscribe({
                next: (data) => {
                    this.ref.close();
                },
                error: error => {
                    this.submitted = false;
                }
            }))
        }
    }


}
