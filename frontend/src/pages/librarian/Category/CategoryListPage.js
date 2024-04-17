import React from 'react'
import CategoryHeader from '../../../components/librarian/category/categoryHeader/CategoryHeader'
import SideBarLibrarian from '../../../components/librarian/Sidebar/SideBarLibrarian'
import CategoryList from '../../../components/librarian/category/categoryList/CategoryList'
import Header from '../../../components/librarian/Sidebar/Header'

const CategoryListPage = () => {

  return (
    <div>
      <Header />
      <SideBarLibrarian />
      <CategoryHeader />
      <CategoryList />
    </div>
  )
}

export default CategoryListPage