using Microsoft.EntityFrameworkCore;
using vega.Models;

public class BlogPostsContext : DbContext
{
    public BlogPostsContext (DbContextOptions<BlogPostsContext> options)
        : base(options)
    {
    }

    public DbSet<BlogPost> BlogPosts { get; set; }
}