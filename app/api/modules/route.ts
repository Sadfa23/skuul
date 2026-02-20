import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function POST(req:NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const {modules} = await req.json()
        
        const newModulesAndLessons = await prisma.$transaction(async (tx) => {
            const results = []
                    for (const module of modules) {
                      const createdModule = await tx.modules.create({
                        data: {
                          courseId: module.courseId,
                          module_title: module.title,
                          module_description: module.description,
                        },
                      });
                  
                      if (module.lessons?.length) {
                        await tx.lessons.createMany({
                          data: module.lessons.map((lessons: any) => ({
                            //id: lessons.id,
                            lesson_title: lessons.title,
                            moduleId: createdModule.id,
                          })),
                        });
                      }
                      results.push(createdModule)
                    }

                    return results
                    
                  });
                return NextResponse.json({
                    newModulesAndLessons
                })
                
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        })
    }
}