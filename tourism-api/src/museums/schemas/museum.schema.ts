import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

@Schema({
  // toJSON: {
  //   getters: true,
  //   virtuals: true,
  // },
  // toObject: {
  // }
})
export class Museum {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  categoryId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artifact' }],
    default: [],
  })
  artifactsIds: string[];
}

export type MuseumDocument = HydratedDocument<Museum>;
export const MuseumSchema = SchemaFactory.createForClass(Museum);

// Duplicate the ID field.
MuseumSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MuseumSchema.set('toJSON', {
  virtuals: true,
});
