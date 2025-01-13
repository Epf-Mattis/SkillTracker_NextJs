/*
  Warnings:

  - You are about to drop the `QuizResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "QuizResult";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Quiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "answer" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
