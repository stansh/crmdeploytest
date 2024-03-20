using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CRM_Solution.Models
{
    public partial class CRMDATAContext : DbContext
    {
        public CRMDATAContext()
        {
        }

        public CRMDATAContext(DbContextOptions<CRMDATAContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<GraphDatum> GraphData { get; set; } = null!;
        public virtual DbSet<Lead> Leads { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=CRMDATA;Integrated Security=True");
            }
        }

    //    protected override void OnModelCreating(ModelBuilder modelBuilder)
    //    {
    //        modelBuilder.Entity<Customer>(entity =>
    //        {
    //            entity.Property(e => e.Id).HasColumnName("id");

    //            entity.Property(e => e.City)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("city");

    //            entity.Property(e => e.Email)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("email");

    //            entity.Property(e => e.FirstName)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("first_name");

    //            entity.Property(e => e.LastName)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("last_name");

    //            entity.Property(e => e.Phone)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("phone");

    //            entity.Property(e => e.State)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("state");

    //            entity.Property(e => e.Street)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("street");

    //            entity.Property(e => e.Zipcode)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("zipcode");
    //        });

    //        modelBuilder.Entity<GraphDatum>(entity =>
    //        {
    //            entity.Property(e => e.Id).HasColumnName("id");

    //            entity.Property(e => e.X)
    //                .HasColumnType("decimal(4, 2)")
    //                .HasColumnName("x");

    //            entity.Property(e => e.Y).HasColumnName("y");
    //        });

    //        modelBuilder.Entity<Lead>(entity =>
    //        {
    //            entity.Property(e => e.Id).HasColumnName("id");

    //            entity.Property(e => e.Email)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("email");

    //            entity.Property(e => e.FirstName)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("first_name");

    //            entity.Property(e => e.LastName)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("last_name");

    //            entity.Property(e => e.Phone)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("phone");
    //        });

    //        modelBuilder.Entity<Product>(entity =>
    //        {
    //            entity.Property(e => e.Id).HasColumnName("id");

    //            entity.Property(e => e.Description)
    //                .HasColumnType("text")
    //                .HasColumnName("description");

    //            entity.Property(e => e.Name)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("name");

    //            entity.Property(e => e.Price)
    //                .HasMaxLength(50)
    //                .IsUnicode(false)
    //                .HasColumnName("price");
    //        });

    //        OnModelCreatingPartial(modelBuilder);
    //    }

    //    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
