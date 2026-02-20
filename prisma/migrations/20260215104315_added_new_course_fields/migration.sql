/*
  Warnings:

  - You are about to drop the column `imageId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "imageId",
DROP COLUMN "imageUrl",
ADD COLUMN     "course_level" TEXT,
ADD COLUMN     "intro_video" TEXT,
ADD COLUMN     "prerequisites" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;
