using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SLU.CS.LAB.Migrations
{
    public partial class ActivitylogTimeOut : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "TimeOut",
                table: "ActivityLogs",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<string>(
                name: "Tutor",
                table: "ActivityLogs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tutor",
                table: "ActivityLogs");

            migrationBuilder.AlterColumn<DateTime>(
                name: "TimeOut",
                table: "ActivityLogs",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);
        }
    }
}
