import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";


export class UserInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
        console.log("UserInterceptor console successfuly...")
        // throw new Error("Method not implemented.");
        return next.handle()
    }

}