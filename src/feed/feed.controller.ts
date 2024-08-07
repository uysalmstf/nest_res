import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    } from '@nestjs/common';
import { FeedDto } from './dto/feed.dto';
import { FeedService } from './feed.service';
import { AuthGuard } from 'src/guards/auth.guard';
    
@UseGuards(AuthGuard)
@Controller('feed')
export class FeedController {
        constructor(private feedService: FeedService) {}
        
        @Post()
        feed(@Body() feedDto: FeedDto, @Req() req) {
        return this.feedService.getFeeds(feedDto, req.user._id);
        }
    }