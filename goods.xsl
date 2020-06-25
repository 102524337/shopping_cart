<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" version="1.0" encoding="UTF-16" standalone="yes"/>

    <xsl:template match = "/items">
        <table>
            <tr>
                <th>Item Number</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Add</th>
            </tr>
        
            <xsl:for-each select="item">
            <xsl:if test= "itemQuantity >0">
            <tr>
                <td><xsl:value-of select="itemNumber" /></td>
                <td><xsl:value-of select="itemName" /></td>
                <td><xsl:value-of select="substring(itemDescrip/text(),1,20)" />...</td>
                <td><xsl:value-of select="itemPrice" /></td>
                <td><xsl:value-of select="itemQuantity" /></td>
                <xsl:variable name="itemNum" select="itemNumber" />
                <td><button onclick ="addCart('{$itemNum}')">Add on to Cart</button></td>
            </tr>
            </xsl:if>
            </xsl:for-each>
            
        </table>
    </xsl:template>
</xsl:stylesheet>