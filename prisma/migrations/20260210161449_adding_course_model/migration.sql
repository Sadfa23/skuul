-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "banner_image" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
