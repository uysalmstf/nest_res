import {
    Controller,
    Post,
    Body,
    } from '@nestjs/common';
import { FeedDto } from './dto/feed.dto';
import { FeedService } from './feed.service';
    
@Controller('feed')
export class FeedController {
        constructor(private feedService: FeedService) {}
        
        @Post()
        feed(@Body() feedDto: FeedDto) {
        return this.feedService.getFeeds(feedDto);
        }
    }