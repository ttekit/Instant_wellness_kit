import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { JurisdictionsService } from './jurisdictions.service';
import { CreateJurisdictionDto } from './dto/create-jurisdictions.dto';
import { UpdateJurisdictionDto } from './dto/update-jurisdictions.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('jurisdictions')
@Controller('jurisdictions')
export class JurisdictionsController {
  constructor(private readonly jurisdictionsService: JurisdictionsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new jurisdiction' })
  @ApiResponse({ status: 201, description: 'The jurisdiction has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateJurisdictionDto })
  create(@Body() createJurisdictionDto: CreateJurisdictionDto) {
    return this.jurisdictionsService.create(createJurisdictionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all jurisdictions' })
  @ApiResponse({ status: 200, description: 'All jurisdictions retrieved successfully.' })
  findAll() {
    return this.jurisdictionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve jurisdiction by ID' })
  @ApiResponse({ status: 200, description: 'Jurisdiction retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Jurisdiction not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the jurisdiction' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jurisdictionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update jurisdiction by ID' })
  @ApiResponse({ status: 200, description: 'The jurisdiction has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Jurisdiction not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the jurisdiction' })
  @ApiBody({ type: UpdateJurisdictionDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJurisdictionDto: UpdateJurisdictionDto) {
    return this.jurisdictionsService.update(id, updateJurisdictionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete jurisdiction by ID' })
  @ApiResponse({ status: 204, description: 'The jurisdiction has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Jurisdiction not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the jurisdiction' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jurisdictionsService.remove(id);
  }
}