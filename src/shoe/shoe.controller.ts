import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShoeService } from './shoe.service';
import { ICreateShoe, IUpdateShoe } from './shoe.type';
import { failResponse, successResponse } from 'src/utils/http';

@Controller('shoe')
@ApiTags('Shoes')
export class ShoeController {
    constructor(
        private readonly shoeService: ShoeService
    ){}

    @Post('/create')
    async createshoe(@Body() input: ICreateShoe): Promise<any> {
        try{
            if (!input.name || !input.price || !input.description || !input.imageUrl)
                return failResponse('Cần điền đầy đủ thông tin', 'FieldIsRequired');
            const shoe = await this.shoeService.create(input);
            return successResponse(shoe);
        } catch(error) {
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

    @Get('/getAll')
    async getAllShoe(): Promise<any>{
        try{
            const listShoe = await this.shoeService.findAll();
            if (listShoe==null)
                return failResponse('Shoe is not found', 'ShoeNotFound');
            return successResponse(listShoe);
        } catch(error){
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

    @Get('/{id}')
    async getById(@Param('id') id: number): Promise<any>{
        try{
            const shoe = await this.shoeService.findById(id);
            if (shoe==null)
                return failResponse('Shoe is not found', 'ShoeNotFound');
            return successResponse(shoe);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

    @Get('/getAllWithShoeBill')
    async getAllWithShoebill(): Promise<any>{
        try{
            const listShoe = await this.shoeService.findAllWithShoeBill();
            if (listShoe==null)
                return failResponse('Shoe is not found', 'ShoeNotFound');
            return successResponse(listShoe);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

    @Put('/update/{id}')
    async updateShoe(@Param('id') id:number, @Body() input: IUpdateShoe): Promise<any>{
        try{
            const shoe = await this.shoeService.findById(id);
            if (shoe==null)
                return failResponse('Shoe is not found', 'ShoeNotFound');
            const shoeUpdate = await this.shoeService.update(id, input);
            if (shoeUpdate==null)
                return failResponse('Execute service went wrong', 'UpdateFail');
            return successResponse(shoeUpdate);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

    @Delete('/delete/{id}')
    async deleteShoe(@Param('id') id: number): Promise<any>{
        try{
            const shoe = await this.shoeService.findById(id);
            if (shoe==null)
                return failResponse('Shoe is not found', 'ShoeNotFound')
            const shoeDelete = await this.shoeService.delete(id);
            if (shoeDelete==null)
                return failResponse('Excute service went wrong', 'DeleteFail');
            return successResponse(shoeDelete);
        }catch(error){
            return failResponse('Execute service went wrong', 'ServiceException')
        }
    }

}
