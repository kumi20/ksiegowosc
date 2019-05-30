export interface invoice{
    number: string;
    documentData: string;
    dataSales: string;
    customerId: number;
    servicesList: fv[];
    toPayNetto: any;
    toPay: any;
    boolToPay: boolean;
    vat50: boolean;
    dataToPay:string;
    boolPay: boolean;
}

export interface company{
    name: string;
    street: string;
    city: string;
    nip: string;
}

export interface fv{
    name: string;
    jm: string;
    count: any;
    netto: any;
    countNetto: any;
    vat: any;
    countVat:any;
    brutto: any;
}