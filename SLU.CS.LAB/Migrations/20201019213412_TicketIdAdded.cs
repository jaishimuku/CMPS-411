using Microsoft.EntityFrameworkCore.Migrations;

namespace SLU.CS.LAB.Migrations
{
    public partial class TicketIdAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TicketId",
                table: "Tickets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TicketId",
                table: "Tickets");
        }
    }
}
