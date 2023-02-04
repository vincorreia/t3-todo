/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TodoType" AS ENUM ('TODO', 'SHOPPING_TODO');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "amount" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Todolist" ADD COLUMN     "type" "TodoType" DEFAULT 'TODO';

-- DropTable
DROP TABLE "Example";
