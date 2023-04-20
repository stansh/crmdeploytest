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
        public virtual DbSet<Lead> Leads { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //optionsBuilder.UseSqlServer(connection string in secrets.json);
                optionsBuilder.UseSqlServer("Name=ConnectionStrings:data");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.CustomerId)
                    .ValueGeneratedNever()
                    .HasColumnName("customer_id");

                entity.Property(e => e.Address)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("address");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("date")
                    .HasColumnName("created_date");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("first_name");

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("last_name");

                entity.Property(e => e.Phone)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("phone");
            });

            modelBuilder.Entity<Lead>(entity =>
            {
                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("first_name");

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("last_name");

                entity.Property(e => e.Phone)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("phone");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Price)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("price");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
