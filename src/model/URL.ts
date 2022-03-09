import { getModelForClass, prop } from "@typegoose/typegoose";

export class URL {

    @prop({ required: true })
    public urlOriginal!: string;

    @prop()
    public hash?: string;

    @prop()
    public urlEncurtadaComHash?: string;

    @prop({ unique: false })
    public apelido?: string;

    @prop()
    public urlEncurtadaComApelido?: string

}

export const URLModel = getModelForClass(URL);