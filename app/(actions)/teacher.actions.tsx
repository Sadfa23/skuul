/*
model Modules {
  id            String    @id @default(cuid())
  module_title  String
  module_description String
  courseId      String
  course        Course    @relation(fields: [courseId], references: [id])
  lessons       Lessons[]
  
}

model Lessons {
  id            String    @id @default(cuid())
  lesson_title  String
  lesson_description String?
  moduleId       String   
  module         Modules @relation(fields: [moduleId], references: [id])
}
*/
import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../lib/prisma";

// This function takes the userId, courseName and lessons
export async function addModule(cleanedModules: []) {
    try {
        const newModulesAndLessons = await prisma.$transaction(async (tx) => {
            for (const module of cleanedModules) {
              const createdModule = await tx.modules.create({
                data: {
                  courseId: module.courseId,
                  module_title: module.title,
                  module_description: module.description,
                },
              });
          
              if (module.lessons?.length) {
                await tx.lesson.createMany({
                  data: module.lessons.map((lesson) => ({
                    title: lesson.title,
                    moduleId: createdModule.id,
                  })),
                });
              }
            }
          });
    } catch (error) {
        
    }
}

export async function createModulesWithLessons(modules) {
    return await prisma.$transaction(async (tx) => {
      for (const mod of modules) {
        const createdModule = await tx.module.create({
          data: {
            title: mod.title,
            description: mod.description,
          },
        });
  
        if (mod.lessons?.length) {
          await tx.lesson.createMany({
            data: mod.lessons.map((lesson) => ({
              title: lesson.title,
              moduleId: createdModule.id,
            })),
          });
        }
      }
    });
  }

export async function uploadVideos() {
    
}
export async function uploadImage() {
    
}

// Statistics students enrolled, revenue etc
export async function getCourseStatics() {
    
}
//quizes, tests, and assignments
