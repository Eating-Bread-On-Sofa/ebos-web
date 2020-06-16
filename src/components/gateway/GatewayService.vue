<template>
    <div>
      <el-row>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>网关服务</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row>
        <br>
        <!--新增按钮-->
        <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round style="float: right" @click="uploadDialog = true">新增
        </el-button>
        <div>
          <el-dialog
            title="添加服务"
            :visible.sync="uploadDialog"
            @close="hideUpload">
            <el-upload
              ref="upload"
              class="upload-demo"
              drag
              action="http://localhost:8090/api/instance/service"
              multiple
              :file-list="fileList"
              :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div slot="tip" class="el-upload__tip">单个文件大小限制100M以内，总文件大小限制1000M</div>
              <!--              <el-button style="position: absolute; bottom: 0px;"  size="small" type="success" @click="submitUpload">上传到服务器</el-button>>-->
            </el-upload>
            <el-button size="small" type="success" @click="submitUpload">上传到网关</el-button>
          </el-dialog>
        </div>
        <div>
          <el-dialog
            title="关闭微服务"
            width="30%"
            :visible.sync="dialogVisible">
            <el-form v-model="servicePort" label-width="120px" style="text-align: left">
              <el-form-item label="服务名称">
                <el-input style="width: 240px" v-model="servicePort" placeholder="请输入服务运行端口号"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="clearServiceStop">取消</el-button>
              <el-button type="primary" @click="handleServiceStop">关闭服务</el-button>
            </div>
          </el-dialog>
        </div>
      </el-row>
      <el-row>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.3)"
          :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          tooltip-effect="dark"
          stripe
          style="width: 100%;">
          <el-table-column
            type="index"
            width="250px"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="服务名称">
          </el-table-column>
          <el-table-column
            prop="extension"
            label="服务包类型">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleServiceStart(scope.$index, scope.row)">开启服务</el-button>
              <el-button
                size="mini"
                type="success"
                @click="dialogVisible = true">关闭服务</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          :total="table.length">
        </el-pagination>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'GatewayService',
  data () {
    return {
      fileList: [],
      currentPage: 1,
      pagesize: 18,
      table: [],
      uploadDialog: false,
      dialogVisible: false,
      servicePort: '',
      loading: true
    }
  },
  mounted () {
    this.loadService()
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
      this.hideUpload()
    },
    hideUpload () {
      this.fileList = []
      this.uploadDialog = false
      this.loadService()
    },
    loadService () {
      this.$axios.get('/instances/instance/service').then(resp => {
        if (resp && resp.status === 200) {
          this.table = resp.data
          this.loading = false
        }
      }).catch(() => {
        this.$message('获取服务列表失败！')
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    clearServiceStop () {
      this.dialogVisible = false
      this.servicePort = ''
    },
    handleServiceStop () {
      this.$axios.delete('/instances/instance/service?port=' + this.servicePort).then(resp => {
        if (resp && resp.status === 200) {
          this.$message('已发送关闭指令，请在终端确认！')
          this.dialogVisible = false
        }
      }).catch(() => {
        this.$message('服务关闭失败！')
      })
    },
    handleServiceStart (index, row) {
      this.$axios.put('/instances/instance/service?jarName=' + row.name).then(resp => {
        if (resp.status === 200) {
          this.$message('服务已成功启动')
          this.loadService()
        }
      }).catch(() => {
        this.$message('服务启动失败！')
      })
    }
  }
}
</script>

<style scoped>

</style>
