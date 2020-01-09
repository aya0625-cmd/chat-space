class ChangeDatatypeImageOfMessages < ActiveRecord::Migration[5.0]
  def change
    change_column :messages, :image, :string
  end
end
