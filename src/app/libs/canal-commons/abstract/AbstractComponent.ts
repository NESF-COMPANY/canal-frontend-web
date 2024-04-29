import {FormGroup} from "@angular/forms";
import {Component, EventEmitter, Injector, OnInit, Output} from "@angular/core";
import {AbstractRootComponent} from "./AbstractRootComponent";

@Component({template: ''})
export abstract class AbstractComponent<DTO, CreateDTO = DTO> extends AbstractRootComponent implements OnInit {

    public override form =  new FormGroup({});
    @Output() finishModificationEvent : EventEmitter<CreateDTO> = new EventEmitter<CreateDTO>() ;

    protected constructor(public override injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        console.log("Parent NgOnInit called !!")
    }

    // @ts-ignore
    protected _selectedDataset: DTO ;
    public onSelectedDatasetChange(value:DTO): void {}

    // @ts-ignore
    get selectedDataset() : DTO  {
        return this._selectedDataset;
    }
    set selectedDataset(value : DTO)  {
        this._selectedDataset = value;
        this.form.reset();
        //this.form.patchValue(this.getFormValues(this.createFormModel(value)));
        this.onSelectedDatasetChange(value);
    }

    protected abstract createFormModel(data?: DTO): FormGroup;

    protected getModelFromForm() : CreateDTO {
        return Object.assign({}, this._selectedDataset, this.getFormValues(this.form));
    }

    protected  getFormValues(formGroup : FormGroup) : CreateDTO {
        let temp = {} as CreateDTO;
        // @ts-ignore
        Object.keys(formGroup.controls).forEach((key) => (temp[key] = formGroup.get(key)?.value));
        return  temp;
    }


}
