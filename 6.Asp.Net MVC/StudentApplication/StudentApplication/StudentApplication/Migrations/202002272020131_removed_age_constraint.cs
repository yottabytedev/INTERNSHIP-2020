namespace StudentApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removed_age_constraint : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Students", "DOB", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Students", "DOB");
        }
    }
}
