import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

@Schema()
export class Artifact {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Museum', required: true })
  museumId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;
}

export type ArtifactDocument = HydratedDocument<Artifact>;
export const ArtifactSchema = SchemaFactory.createForClass(Artifact);


// Duplicate the ID field.
ArtifactSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ArtifactSchema.set('toJSON', {
  virtuals: true,
});
