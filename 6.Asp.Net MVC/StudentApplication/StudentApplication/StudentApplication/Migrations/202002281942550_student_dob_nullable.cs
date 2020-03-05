namespace StudentApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class student_dob_nullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Students", "DOB", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Students", "DOB", c => c.DateTime(nullable: false));
        }
    }
}
