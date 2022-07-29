import {Router, Request, Response} from "express";

class AccountController {

    private router: Router = Router();

    constructor() {
        this.router.get("/", this.getHello);
    }

    public getRouter(){
        return this.router;
    }

    private getHello(req: Request, res: Response){
        res.send("Hello my friends");
    }
}

export default (new AccountController()).getRouter();