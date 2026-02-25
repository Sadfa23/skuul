interface Module {
  courseId: string;
  title: string;
  description: string;
}

interface Lesson {
  courseId: string;
  title: string;
  description: string;
}

import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../lib/prisma";
import { NextResponse } from "next/server";
/*
// This function takes the userId, courseName and lessons
export async function addModule(cleanedModules: Module[]) {
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
        console.log("Error in adding the modules and lessons"
          , error
        )
        return NextResponse.json({success: false, error})
    }
}

export async function createModulesWithLessons(modules:Module) {
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
*/