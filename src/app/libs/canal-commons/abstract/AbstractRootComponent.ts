import {Component, Injector, OnDestroy} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({template: ''})
export abstract class AbstractRootComponent implements OnDestroy {
    public subscriptionList: Array<{id: string; subscription: Subscription}> = [];
    public destroy$: Subject<void> = new Subject<void>();
    public form: FormGroup | undefined;
    // public translateService : TranslateService;
    public datePipe : DatePipe;
    public activatedRoute : ActivatedRoute;

    protected constructor(public injector: Injector) {
        // this.translateService =  injector.get(TranslateService, Injector.THROW_IF_NOT_FOUND) as TranslateService;
        this.datePipe =  injector.get(DatePipe, Injector.THROW_IF_NOT_FOUND) as DatePipe;
        this.activatedRoute =  injector.get(ActivatedRoute, Injector.THROW_IF_NOT_FOUND) as ActivatedRoute;

    }

    public addSubscription(id: string, subscription: Subscription): void {
        this.subscriptionList.push({id, subscription});
    }

    public doUnsubscribeAll(): void {
        this.subscriptionList.forEach((subscription) => {
            if(subscription.subscription) {
                subscription.subscription.unsubscribe();
            }
        })
        this.subscriptionList = [];
    }

    ngOnDestroy(): void {
        this.doUnsubscribeAll();
        this.destroy$.next();
        this.destroy$.complete();
    }

    // public translate = (key : string) => this.translateService.instant(key);



}
