import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mstotime'
})

export class MillisecondsToTimePipe implements PipeTransform{
  transform(value: number): string {
    let seconds = Math.floor((value/1000)%60)
      , minutes = Math.floor((value/(1000*60))%60)
      , hours = Math.floor((value/(1000*60*60))%24)
      , days = Math.floor(value/(24*60*60*1000))

    if (days > 0){
      return days + "d " + hours + "h " + minutes + "m";}


    if( days < 1 && hours == 0 ){
        return minutes + "m " + seconds +'s'
    } else if (hours > 0) { return hours + "h " + minutes + "m "  }
  }
}
