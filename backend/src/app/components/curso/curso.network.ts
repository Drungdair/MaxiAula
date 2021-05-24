import express, { Request, Response, Router } from "express";
import responseModule from "../../modules/response.module";
import { Curso } from '../../models/curso.model';
import cursoController from "./curso.controller";



const router: Router = express.Router();

router.post('/add', async(req: Request, res: Response) => {
    const body: Curso = req.body;

    try {
        const result: Curso = await cursoController.addCurso(body);
        responseModule.success(req, res, result, 201);
    } catch (error) {
        responseModule.error(req, res, "Error desconocido");
    }
});

router.get('/all', async(req: Request, res: Response) => {
    try {
        const result: Curso[] = await cursoController.getCursos();
        responseModule.success(req, res, result);
    } catch (error) {
        responseModule.error(req, res, "Error desconocido");
    }
});

router.get('/id/:_id', async(req: Request, res: Response) => {
    const _id: string = req.params._id;
    try {
        const result = await cursoController.getCursoById(_id);
        responseModule.success(req, res, result);
    } catch (error) {
        responseModule.error(req, res, "Error Desconocido");
    }
});

router.delete('/delete/:_id', async(req: Request, res: Response) => {
    const _id: string = req.params._id;
    try {
        const result = await cursoController.deleteCurso(_id);
        responseModule.success(req, res, result);
    } catch (error) {
        responseModule.error(req, res, "Error Desconocido");
    }
})

router.put('/put/:_id', async(req: Request, res: Response) => {
    const _id: string = req.params._id;
    const body: Curso = req.body;
    try {
        const result = await cursoController.putCurso(_id, body);
        responseModule.success(req, res, result);
    } catch (error) {
        responseModule.error(req, res, "Error Desconocido");
    }
})


export default router;