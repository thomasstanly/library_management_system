import React from 'react'
import CategoryHeader from '../../../components/librarian/category/categoryHeader/CategoryHeader'
import SideBarLibrarian from '../../../components/librarian/Sidebar/SideBarLibrarian'

const CategoryListPage = () => {
   
  return (
    <div>
        <SideBarLibrarian/>
        <CategoryHeader name='Category' />
    </div>
  )
}

export default CategoryListPage