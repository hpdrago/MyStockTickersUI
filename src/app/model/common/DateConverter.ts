import { JsonConverter, JsonCustomConvert } from "json2typescript";

@JsonConverter
export class DateConverter implements JsonCustomConvert<Date>
{
    public serialize( date: Date ): any
    {
        //"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + 'T' +
               date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    public deserialize( date: any ): Date
    {
        return new Date( date );
    }
}
