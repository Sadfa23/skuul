import React from 'react'
import { Label } from './ui/label'
import { Button } from './ui/button'
export async function uploadImage(params:type) {
    
  return (
    <div className="space-y-2 mb-6">
                      <Label>Upload Intro Image</Label>
                      {thumbnail.preview ? (
                        <div className="relative border-2 border-gray-200 rounded-lg p-4">
                          <img
                            src={thumbnail.preview}
                            alt="Thumbnail preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white shadow-sm"
                            onClick={() =>
                              setThumbnail({ file: null, preview: null })
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleImageDrop}
                          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
                        >
                          <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-1">
                              Drag and drop files, or{' '}
                              <span className="text-blue-600 hover:underline">
                                Browse
                              </span>
                            </p>
                            <p className="text-sm text-gray-500">
                              Upload Thumbnail in JPEG, PNG.
                            </p>
                          </label>
                        </div>
                      )}
                      {errors.image && (
                        <p className="text-sm text-red-500">{errors.image}</p>
                      )}
                    </div>
  )
}

export default.