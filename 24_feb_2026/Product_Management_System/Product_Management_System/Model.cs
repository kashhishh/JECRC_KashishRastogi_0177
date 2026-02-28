using System;
using System.Collections.Generic;
using System.Text;

namespace Product_Management_System
{
    internal class Model
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public float Price { get; set; }
        public bool IsStock { get; set; }
    }
}
