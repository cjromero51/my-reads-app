import React from 'react'

class Book extends React.Component {
  render(){
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 192,
              backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' }}
              >
            </div>
            <ShelfSwitcher/>
          </div>
          <div className="book-title">Tom Sawyer</div>
          <div className="book-authors">LoL idk</div>
        </div>
      </li>
    )
  }
}
export default Book
