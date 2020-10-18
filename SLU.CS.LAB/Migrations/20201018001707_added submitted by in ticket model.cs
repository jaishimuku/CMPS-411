using Microsoft.EntityFrameworkCore.Migrations;

namespace SLU.CS.LAB.Migrations
{
    public partial class addedsubmittedbyinticketmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SubmittedBy",
                table: "Tickets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubmittedBy",
                table: "Tickets");
        }
    }
}
