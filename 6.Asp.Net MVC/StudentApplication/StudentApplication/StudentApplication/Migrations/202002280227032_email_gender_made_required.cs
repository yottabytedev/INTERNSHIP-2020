namespace StudentApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class email_gender_made_required : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Students", "Email", c => c.String(nullable: false));
            AlterColumn("dbo.Students", "Gender", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Students", "Gender", c => c.String());
            AlterColumn("dbo.Students", "Email", c => c.String());
        }
    }
}
