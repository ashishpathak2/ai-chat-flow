import mongoose from 'mongoose'

const flowSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: [true, 'Prompt is required'],
      trim: true,
      minlength: [1, 'Prompt cannot be empty'],
    },
    response: {
      type: String,
      required: [true, 'Response is required'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // We manage createdAt manually
    versionKey: false,
  }
)

// Index for faster querying by date
flowSchema.index({ createdAt: -1 })

const Flow = mongoose.model('Flow', flowSchema)

export default Flow
