import fs from 'fs';
import path from 'path';
import {parse}from 'csv-parse/sync';

export class DataReader {   
    
    static readCSV(filePath: string): any[] {
        const absolutePath = path.resolve(filePath);
        const fileContent = fs.readFileSync(absolutePath, 'utf-8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true
        });
        return records;
    }

    static readJSON(filePath: string): any {
        const absolutePath = path.resolve(filePath);
        const fileContent = fs.readFileSync(absolutePath, 'utf-8');
        return JSON.parse(fileContent);
    }
    
}