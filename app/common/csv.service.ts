import {Injectable} from '@angular/core';

@Injectable()
export class CSVService {
    parse(csv: string): any {
        if (csv) {
            let rows = csv.match(/^.+/gm),
                fieldDelimiter = ';',
                firstRow = rows[0].replace(/\"/g, '').split(fieldDelimiter),
                parsed = [];

            for (let i = 1, ilen = rows.length; i < ilen; i++) {
                let parseItem = {},
                    parsedRow = rows[i].split(fieldDelimiter);

                for (let j = 0, jlen = firstRow.length; j < jlen; j++) {
                    parseItem[firstRow[j]] = parsedRow[j];
                }

                parsed.push(parseItem);
            }

            return parsed;
        }

        return [];
    }
}