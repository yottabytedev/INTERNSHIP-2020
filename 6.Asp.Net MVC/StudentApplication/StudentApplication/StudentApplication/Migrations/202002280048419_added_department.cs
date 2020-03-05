namespace StudentApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class added_department : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        DepartmentId = c.Int(nullable: false, identity: true),
                        DepartmentName = c.String(),
                        Location = c.String(),
                    })
                .PrimaryKey(t => t.DepartmentId);
            
            AddColumn("dbo.Students", "DepartmentId", c => c.Int());
            AlterColumn("dbo.Students", "FirstName", c => c.String(nullable: false));
            CreateIndex("dbo.Students", "DepartmentId");
            AddForeignKey("dbo.Students", "DepartmentId", "dbo.Departments", "DepartmentId");
            DropColumn("dbo.Students", "Age");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Students", "Age", c => c.Int(nullable: false));
            DropForeignKey("dbo.Students", "DepartmentId", "dbo.Departments");
            DropIndex("dbo.Students", new[] { "DepartmentId" });
            AlterColumn("dbo.Students", "FirstName", c => c.String());
            DropColumn("dbo.Students", "DepartmentId");
            DropTable("dbo.Departments");
        }
    }
}
